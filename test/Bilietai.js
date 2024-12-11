const Bilietai = artifacts.require("Bilietai");

contract("Bilietai", (accounts) => {
  const SAVININKAS = accounts[0]; // Kontrakto savininkas
  const PIRKEJAS = accounts[1];
  const NAUJAS_SAVININKAS = accounts[2];
  const BILIETO_ID = 1;

  it("Turėtų sukurti bilietus su numatytais parametrais", async () => {
    const instance = await Bilietai.deployed();

    const bilietas = await instance.bilietai(BILIETO_ID);
    assert.equal(bilietas.id.toNumber(), BILIETO_ID, "Bilieto ID nesutampa");
    assert.equal(
      web3.utils.fromWei(bilietas.kaina.toString(), "ether"),
      "0.1",
      "Bilieto kaina turėtų būti 0.1 ETH"
    );
    assert.equal(
      bilietas.owner,
      "0x0000000000000000000000000000000000000000",
      "Bilieto savininkas turėtų būti nulinis adresas"
    );
    assert.equal(bilietas.galiojantis, true, "Bilietas turėtų būti galiojantis");
  });

  it("Turėtų leisti klientui pirkti bilietą", async () => {
    const instance = await Bilietai.deployed();

    await instance.pirktiBilieta(BILIETO_ID, {
      from: PIRKEJAS,
      value: web3.utils.toWei("0.1", "ether"),
    });

    const bilietas = await instance.bilietai(BILIETO_ID);
    assert.equal(
      bilietas.owner.toLowerCase(),
      PIRKEJAS.toLowerCase(),
      "Bilietas turėtų priklausyti pirkėjui"
    );
  });

  it("Neturėtų leisti pirkti jau nupirkto bilieto", async () => {
    const instance = await Bilietai.deployed();

    try {
      await instance.pirktiBilieta(BILIETO_ID, {
        from: accounts[3],
        value: web3.utils.toWei("0.1", "ether"),
      });

      assert.fail("Leido pirkti jau parduotą bilietą");
    } catch (error) {
      assert(
        error.message.includes("Bilietas jau parduotas"),
        `Tikėtasi klaidos su pranešimu 'Bilietas jau parduotas', bet gauta: ${error.message}`
      );
    }
  });

  it("Turėtų leisti perleisti bilietą kitam naudotojui", async () => {
    const instance = await Bilietai.deployed();

    await instance.perleistiBilieta(BILIETO_ID, NAUJAS_SAVININKAS, {
      from: PIRKEJAS,
    });

    const bilietas = await instance.bilietai(BILIETO_ID);
    assert.equal(
      bilietas.owner.toLowerCase(),
      NAUJAS_SAVININKAS.toLowerCase(),
      "Bilietas turėtų priklausyti naujam savininkui"
    );
  });

  it("Neturėtų leisti perleisti bilieto, jei perleidėjas nėra savininkas", async () => {
    const instance = await Bilietai.deployed();

    try {
      await instance.perleistiBilieta(BILIETO_ID, accounts[4], {
        from: accounts[5],
      });

      assert.fail("Leido perleisti bilietą ne savininkui");
    } catch (error) {
      assert(
        error.message.includes("Jus neturite sio bilieto"),
        `Tikėtasi klaidos su pranešimu 'Jus neturite sio bilieto', bet gauta: ${error.message}`
      );
    }
  });

  it("Turėtų leisti grąžinti bilietą ir atgauti pinigus", async () => {
    const instance = await Bilietai.deployed();

    const bilietasPries = await instance.bilietai(BILIETO_ID);
    const priesBalansas = BigInt(await web3.eth.getBalance(NAUJAS_SAVININKAS));

    await instance.grazintiBilieta(BILIETO_ID, {
      from: NAUJAS_SAVININKAS,
    });

    const bilietasPo = await instance.bilietai(BILIETO_ID);
    const poBalansas = BigInt(await web3.eth.getBalance(NAUJAS_SAVININKAS));

    assert.equal(
      bilietasPo.owner,
      "0x0000000000000000000000000000000000000000",
      "Bilietas turėtų priklausyti nuliui po grąžinimo"
    );
    assert.equal(bilietasPo.galiojantis, false, "Bilietas turėtų būti negaliojantis");
    assert(
      poBalansas > priesBalansas,
      "Pinigai turėtų būti grąžinti savininkui"
    );
  });

  it("Turėtų leisti savininkui uždaryti rezervacijas", async () => {
    const instance = await Bilietai.deployed();

    await instance.uzdarytiRezervacijas({ from: SAVININKAS });

    for (let i = 0; i < 5; i++) {
      const bilietas = await instance.bilietai(i);
      assert.equal(bilietas.galiojantis, false, `Bilietas ${i} turėtų būti negaliojantis`);
    }
  });

  it("Neturėtų leisti kitiems nei savininkui uždaryti rezervacijų", async () => {
    const instance = await Bilietai.deployed();

    try {
      await instance.uzdarytiRezervacijas({ from: PIRKEJAS });

      assert.fail("Leido ne savininkui uždaryti rezervacijas");
    } catch (error) {
      assert(
        error.message.includes("Tik savininkas gali uzdaryti rezervacijas"),
        `Tikėtasi klaidos su pranešimu 'Tik savininkas gali uzdaryti rezervacijas', bet gauta: ${error.message}`
      );
    }
  });

  it("Turėtų leisti savininkui išsiimti pajamas", async () => {
    const instance = await Bilietai.deployed();

    // Pirkimas, kad būtų surinkta pajamų
    await instance.pirktiBilieta(2, {
      from: PIRKEJAS,
      value: web3.utils.toWei("0.1", "ether"),
    });

    const priesBalansas = BigInt(await web3.eth.getBalance(SAVININKAS));
    const kontraktoBalansas = BigInt(await web3.eth.getBalance(instance.address));

    assert(
      kontraktoBalansas > 0,
      "Kontrakte turi būti pinigų, kad pajamos būtų išimtos"
    );

    // Savininkas išima pajamas
    await instance.issiimtiPajamas({ from: SAVININKAS });

    const poBalansas = BigInt(await web3.eth.getBalance(SAVININKAS));
    assert(
      poBalansas > priesBalansas,
      "Savininkas turėtų gauti pajamas"
    );
  });
});
