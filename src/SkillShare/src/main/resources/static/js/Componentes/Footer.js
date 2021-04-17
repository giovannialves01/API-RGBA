class Footer extends HTMLElement {
    constructor () {
        super();
    }

    connectedCallback() {
        let footer = this.buildFooter();

        this.appendChild(footer);
    }

    buildSVG(){
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttributeNS(null, "viewBox", "0 0 500 150");
        svg.setAttributeNS(null, "preserveAspectRatio", "none");
        svg.style = "height: 100%; width: 100%; position: absolute; z-index: -1;"

        let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttributeNS(null, "d", "M-18.34,23.19 C136.84,-28.13 306.15,103.13 511.00,10.36 L500.00,150.00 L0.00,150.00 Z");
        path.style="stroke: none; fill: #0AADA7;"

        svg.appendChild(path);

        return svg;
    }

    buildFooter(){
        let footer = document.createElement("div");
        footer.classList.add("footer");

        let logo = this.buildLogo();
        let options = this.buildOptions();
        let svg = this.buildSVG();

        footer.appendChild(logo);
        footer.appendChild(options);
        footer.appendChild(svg);

        return footer;
    }

    buildLogo(){
        let logoContainer = document.createElement("div");
        logoContainer.classList.add("logoFooter");

        let logo = document.createElement("img");
        logo.src = "images/logoSkillShare.PNG";

        let copyrigth = document.createElement("label");
        copyrigth.textContent = "© 2021 - SkillShare - RGBA";

        logoContainer.appendChild(logo);
        logoContainer.appendChild(copyrigth);

        return logoContainer;
    }

    buildOptions(){
        let navegacaoContainer = document.createElement("div");
        navegacaoContainer.classList.add("opcoes");

        let navegacao = this.buildNavegacao();
        let sobreNos = this.buildSobreNos();

        navegacaoContainer.appendChild(navegacao);
        navegacaoContainer.appendChild(sobreNos);

        return navegacaoContainer;
    }

    buildNavegacao(){
        let container = document.createElement("div");
        container.classList.add("navegacao");

        let header = document.createElement("h1");
        header.classList.add("title");
        header.textContent = "Navegação";

        let option1 = document.createElement("p");
        option1.classList.add("text");
        option1.textContent = "Home";
        option1.onclick = function () {
            window.location.href = "/";
        }

        container.appendChild(header);
        container.appendChild(option1);

        return container;
    }

    buildSobreNos(){
        let container = document.createElement("div");
        container.classList.add("navegacao");

        let header = document.createElement("h1");
        header.classList.add("title");
        header.textContent = "Sobre nós";

        let option1 = document.createElement("p");
        option1.classList.add("text");
        option1.textContent = "GitHub";
        option1.onclick = function (){
            window.open("https://github.com/giovannialves01/API-RGBA", '_blank').focus();
        }

        container.appendChild(header);
        container.appendChild(option1);

        return container;
    }
}

customElements.define("footer-rgba", Footer);