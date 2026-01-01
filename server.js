const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.static("public"));

// Lista de downloads (apenas exemplo)
const mirrors = {
    "ubuntu": "https://mirror.uepg.br/ubuntu-releases/",
    "fedoraold": "https://archives.fedoraproject.org/pub/archive/fedora/linux/releases/",
    "arch": "https://archlinux.org/releng/releases/",
};

// Estrutura de arquivos e pastas
const fileStructure = {
    "": { // Diretório raiz
        directories: ["ubuntu", "fedora", "arch"], // Pastas
        files: [] // Nenhum arquivo na raiz, NÃO COLOQUE!
    },
    "ubuntu": {
        directories: [],
        files: [
            { name: "Ubuntu 24.10", url: mirrors.ubuntu + "24.10/ubuntu-24.10-desktop-amd64.iso" },
            { name: "Ubuntu 22.04 ", url: mirrors.ubuntu + "22.04/ubuntu-22.04.5-desktop-amd64.iso" },
            { name: "Ubuntu 16.04", url: mirrors.ubuntu + "16.04/ubuntu-16.04.7-desktop-amd64.iso" }
        ]
    },
    "fedora": {
        directories: [],
        files: [
            { name: "Fedora 39", url: mirrors.fedoraold + "39/Workstation/x86_64/iso/Fedora-Workstation-Live-x86_64-39-1.5.iso" },
            { name: "Fedora 38", url: mirrors.fedoraold + "38/Workstation/x86_64/iso/Fedora-Workstation-Live-x86_64-38-1.6.iso" }
        ]
    },
    "arch": {
        directories: [],
        files: [
            { name: "Arch Linux 2025", url: mirrors.arch + "2025.02.01/torrent/" },
            { name: "Arch Linux 2024", url: mirrors.arch + "2024.12.01/torrent/" }
        ]
    }
};

// API para obter os arquivos e pastas com o caminho
app.get("/api/files", (req, res) => {
    const pathRequested = req.query.path || "";
    const structure = fileStructure[pathRequested];

    if (structure) {
        res.json(structure); // Retorna os arquivos e diretórios
    } else {
        res.status(404).json({ error: "Pasta não encontrada" });
    }
});

// Servir a página inicial
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000, () => {
    console.log("🚀 Servidor rodando em http://localhost:3000");
});
