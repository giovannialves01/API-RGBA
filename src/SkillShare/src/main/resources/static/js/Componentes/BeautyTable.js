/**
 * - dataSource
 * - tableTitle
 */
class BeautyTable extends HTMLElement{
    constructor(){
        super();

        this.dataSource;
        this.tableTitle;
        this.data;
        this.columns;
        this.rows;
        this.extraConfigs;

    }

    connectedCallback(){
        this.dataSource = this.getAttribute("dataSource");
        this.tableTitle = this.getAttribute("tableTitle")
        this.data = tableData();
        this.columns = this.data["columns"];
        this.rows = this.data["rows"];
        this.extraConfigs = this.data["extraConfigs"];

        let table = this.buildBeautyTable();

        this.appendChild(table);

        this.setTableBehaviour();
    }

    buildBeautyTable(){
        let tableContainer = this.buildTableContainer();

        let tableTitle = document.createElement("h3");
        tableTitle.textContent = this.tableTitle;

        let tableToolbar = this.buildTableToolbar();

        let table = this.buildTable();

        tableContainer.appendChild(tableTitle);
        tableContainer.appendChild(tableToolbar);
        tableContainer.appendChild(table);
        
        return tableContainer;
    }

    buildTableContainer(){
        let div = document.createElement("div");
        div.classList.add("tableContainer");
        div.id = this.id + "-beautyTable";

        return div;
    }

    buildTableToolbar(){
        let container = document.createElement("div");

        let labelFilter = document.createElement("label");
        labelFilter.textContent = "Filtro: ";

        let fieldsToFilter = document.createElement("select");
        let columnsKeys = Object.keys(this.columns);

        let firstOption = document.createElement("option");
        firstOption.textContent = "Escolha uma coluna para ordenar";
        fieldsToFilter.appendChild(firstOption);

        for (let i = 0; i < columnsKeys.length; i++) {
            const key = columnsKeys[i];
            
            let option = document.createElement("option");
            option.textContent = this.columns[key];

            fieldsToFilter.appendChild(option);
        }

        let filterOrder = document.createElement("select");

        let filterOrderOption = document.createElement("option");
        filterOrderOption.textContent = "Crescente";
        filterOrder.appendChild(filterOrderOption);

        filterOrderOption = document.createElement("option");
        filterOrderOption.textContent = "Decrescente";
        filterOrder.appendChild(filterOrderOption);

        container.appendChild(labelFilter);
        container.appendChild(fieldsToFilter);
        container.appendChild(filterOrder);

        return container;
    }
    
    buildTable(){
        let table = document.createElement("table");
        table.classList.add("beautyTable");

        let tableHead = this.buildTableHead(); 

        let tableBody = this.buildTableBody();

        table.appendChild(tableHead);
        table.appendChild(tableBody);

        return table;
    }

    buildTableHead(){
        let thead = document.createElement("thead");
        let tr = document.createElement("tr");

        let columnsKeys = Object.keys(this.columns);

        for (let i = 0; i < columnsKeys.length; i++) {
            const key = columnsKeys[i];
            
            let column = document.createElement("th");
            column.textContent = this.columns[key];
            column.classList.add("tableHeader");

            tr.appendChild(column);
        }

        thead.appendChild(tr);

        return thead;
    }

    buildTableBody(){
        let tbody = document.createElement("tbody");
        let columnsKeys = Object.keys(this.columns);

        for (let i = 0; i < this.rows.length; i++) {
            const row = this.rows[i];

            let tr = document.createElement("tr");
            if(i % 2 != 0){
                tr.classList.add("evenRow");
            }

            for (let x = 0; x < columnsKeys.length; x++) {
                const key = columnsKeys[x];
                
                let td = document.createElement("td");
                td.textContent = row[key];

                tr.appendChild(td);
            }

            tbody.appendChild(tr);

        }

        return tbody;
    }


    setTableBehaviour(){
        let table = document.getElementById(this.id + "-beautyTable");

        table.addEventListener("click", function(event) {
            if(event.target.tagName == "TD"){
                let selectedRow = event.target;

                let selectedRows = document.getElementsByClassName("selectedRow");
                for (let i = 0; i < selectedRows.length; i++) {
                    const row = selectedRows[i];
                    
                    row.classList.remove("selectedRow");
                }

                selectedRow.parentNode.classList.add("selectedRow");
            }
            
        });
    }

}

// Declara a nova tag para que seja reconhecida na página HTML
customElements.define("beauty-table", BeautyTable);
