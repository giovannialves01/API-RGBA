/**
 * - dataSource
 * - tableTitle
 */
class BeautyTable extends HTMLElement{
    constructor(){
        super();

        this.entityToList;
        this.tableTitle;
        this.data;
        this.columns;
        this.rows;
        this.extraConfigs;

    }

    async connectedCallback(){
        this.entityToList = this.getAttribute("entityToList");
        this.tableTitle = this.getAttribute("tableTitle")
        this.data = await this.getData(this.entityToList);
        this.columns = this.data["columns"];
        this.rows = this.data["rows"];
        this.extraConfigs = this.data["extraConfigs"];

        let table = this.buildBeautyTable(this.id, this.tableTitle, this.columns, this.rows, this.extraConfigs);
        
        this.appendChild(table);

        this.setTableBehaviour(this.id);
    }

    buildBeautyTable(id, title, columns, rows, extraConfigs){
        let tableContainer = this.buildTableContainer(id);

        let tableTitle = document.createElement("h3");
        tableTitle.textContent = title;

        let tableToolbar = this.buildTableToolbar(columns);

        let table = this.buildTable(columns, rows);

        tableContainer.appendChild(tableTitle);
        tableContainer.appendChild(tableToolbar);
        tableContainer.appendChild(table);
        
        return tableContainer;
    }

    buildTableContainer(id){
        let div = document.createElement("div");
        div.classList.add("tableContainer");
        div.id = id + "-beautyTable";

        return div;
    }

    buildTableToolbar(columns){
        let container = document.createElement("div");

        let labelFilter = document.createElement("label");
        labelFilter.textContent = "Filtro: ";

        let fieldsToFilter = document.createElement("select");
        let columnsKeys = Object.keys(columns);

        let firstOption = document.createElement("option");
        firstOption.textContent = "Escolha uma coluna para ordenar";
        fieldsToFilter.appendChild(firstOption);

        for (let i = 0; i < columnsKeys.length; i++) {
            const key = columnsKeys[i];
            
            let option = document.createElement("option");
            option.textContent = columns[key];

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
    
    buildTable(columns, rows){
        let table = document.createElement("table");
        table.classList.add("beautyTable");

        let tableHead = this.buildTableHead(columns); 

        let tableBody = this.buildTableBody(columns, rows);

        table.appendChild(tableHead);
        table.appendChild(tableBody);

        return table;
    }

    buildTableHead(columns){
        let thead = document.createElement("thead");
        let tr = document.createElement("tr");

        let columnsKeys = Object.keys(columns);

        for (let i = 0; i < columnsKeys.length; i++) {
            const key = columnsKeys[i];
            
            let column = document.createElement("th");
            column.textContent = columns[key];
            column.classList.add("tableHeader");

            tr.appendChild(column);
        }

        thead.appendChild(tr);

        return thead;
    }

    buildTableBody(columns, rows){
        let tbody = document.createElement("tbody");
        let columnsKeys = Object.keys(columns);

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

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


    setTableBehaviour(id){
        let table = document.getElementById(id + "-beautyTable");

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

    getData(entityToList){
        let data;
        let user = new Usuario();

        switch (entityToList) {
            case "Usuario":
                data = user.toTableData();
                break;
        
            default:
                break;
        }

        return data;
    }

    refreshTable(id){
        let beautyTable = document.getElementById(id);
        let table = document.getElementById(id + "-beautyTable");

        beautyTable.removeChild(table);

        beautyTable.connectedCallback();

    }

}

// Declara a nova tag para que seja reconhecida na página HTML
customElements.define("beauty-table", BeautyTable);

var beautyTable = new BeautyTable();
