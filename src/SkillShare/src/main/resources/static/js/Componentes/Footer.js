class Footer extends HTMLElement {
    constructor () {
        super();
    }

    connectedCallback() {
        let footer = document.createElement("div");
        let logo = document.createElement("div");
        let opcoes = document.createElement("div");
        let navegacao = document.createElement("div");
        let navegacao2 = document.createElement("div");

        let img = document.createElement("img");
        let label = document.createElement("label");

        let h1 = document.createElement("h1");
        let p = document.createElement("p");
        let h12 = document.createElement("h1");
        let p2 = document.createElement("p");

        footer.classList.add("footer");
        logo.classList.add("logo");
        opcoes.classList.add("opcoes");
        navegacao.classList.add("navegacao");
        navegacao2.classList.add("navegacao");

        h1.classList.add("title");
        p.classList.add("text");
        h12.classList.add("title");
        p2.classList.add("text");

        h1.textContent = "Navegação";
        p.textContent = "Home";
        h12.textContent = "Sobre Nós";
        p2.textContent = "GitHub";

        img.src = "../static/images/logoSkillShare.PNG";
        img.alt = "Logo SkillShare";

        label.textContent = "© 2021 - SkillShare - RGBA";

        footer.appendChild(logo);
        opcoes.appendChild(navegacao);
        opcoes.appendChild(navegacao2);
        footer.appendChild(opcoes);

        logo.appendChild(img);
        logo.appendChild(label);

        navegacao.appendChild(h1);
        navegacao.appendChild(p);
        navegacao2.appendChild(h12);
        navegacao2.appendChild(p2);

        this.appendChild(footer);
    }
}

customElements.define("footer-rgba", Footer);