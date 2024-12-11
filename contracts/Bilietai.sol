// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

uint256 constant BILIETU_SKAICIUS = 300;

contract Bilietai {
    address public owner; // Sutarties savininkas (kino teatro savininkas)
    uint256 public totalRevenue; // Surinktos pajamos už bilietus

    struct Bilietas {
        uint256 id;
        uint256 kaina;
        address owner; // Bilieto savininkas
        bool galiojantis; // Tikrina, ar bilietas galioja
    }

    Bilietas[BILIETU_SKAICIUS] public bilietai;

    event BilietasPirktas(uint256 id, address indexed pirkejas);
    event BilietasPerleistas(uint256 id, address indexed nuo, address indexed iki);
    event PajamosIssiimtos(uint256 suma, address indexed savininkas);

    constructor() {
        owner = msg.sender;
        for (uint256 i = 0; i < BILIETU_SKAICIUS; i++) {
            bilietai[i].id = i;
            bilietai[i].kaina = 0.1 ether; // 0.1 ETH
            bilietai[i].owner = address(0x0);
            bilietai[i].galiojantis = true;
        }
    }

    function pirktiBilieta(uint256 _id) external payable {
        require(_id < BILIETU_SKAICIUS, "Bilietas neegzistuoja");
        require(bilietai[_id].owner == address(0x0), "Bilietas jau parduotas");
        require(msg.value >= bilietai[_id].kaina, "Nepakanka lesu");

        bilietai[_id].owner = msg.sender;
        totalRevenue += msg.value;

        emit BilietasPirktas(_id, msg.sender);
    }

    function perleistiBilieta(uint256 _id, address _naujasOwner) external {
        require(_id < BILIETU_SKAICIUS, "Bilietas neegzistuoja");
        require(bilietai[_id].owner == msg.sender, "Jus neturite sio bilieto");
        require(bilietai[_id].galiojantis, "Bilietas negalioja");
        require(_naujasOwner != address(0x0), "Neteisingas naujo savininko adresas");

        bilietai[_id].owner = _naujasOwner;

        emit BilietasPerleistas(_id, msg.sender, _naujasOwner);
    }

    function grazintiBilieta(uint256 _id) external {
        require(_id < BILIETU_SKAICIUS, "Bilietas neegzistuoja");
        require(bilietai[_id].owner == msg.sender, "Jus neturite sio bilieto");
        require(bilietai[_id].galiojantis, "Bilietas negalioja");

        bilietai[_id].owner = address(0x0);
        bilietai[_id].galiojantis = false;

        totalRevenue -= bilietai[_id].kaina;

        payable(msg.sender).transfer(bilietai[_id].kaina);
    }

    function uzdarytiRezervacijas() external {
        require(msg.sender == owner, "Tik savininkas gali uzdaryti rezervacijas");

        for (uint256 i = 0; i < BILIETU_SKAICIUS; i++) {
            bilietai[i].galiojantis = false;
        }
    }

    function issiimtiPajamas() external {
        require(msg.sender == owner, "Tik savininkas gali issiimti pajamas");
        require(totalRevenue > 0, "Nera surinktu pajamu");

        uint256 pajamos = totalRevenue;
        totalRevenue = 0;

        payable(owner).transfer(pajamos);

        emit PajamosIssiimtos(pajamos, owner);
    }
}
