(function () {
    //Checks if user's browser has localStorage api
    if (localStorage) {
        //Retrieves users
        let users = JSON.parse(localStorage.getItem('users'));

        //Checks if users variable evaluates to true
        if (users) {

            //Creates h1 tag and sets its text and class
            let h2 = document.createElement('h2');
            h2.innerText = "List Of Our Members";
            h2.classList = 'members-header';

            //Appends the h1 to the body element
            document.body.appendChild(h2);

            //Creates table element
            let table = document.createElement('table');

            //Creates table headers for all the columns needed
            let usernameHeader = document.createElement('th');
            let emailHeader = document.createElement('th');
            let snHeader = document.createElement('th');

            //Sets the text of the table headers
            snHeader.innerText = "S/N";
            usernameHeader.innerText = "Username";
            emailHeader.innerText = "Email";

            //Appends the table headers to the table element
            table.appendChild(snHeader);
            table.appendChild(usernameHeader);
            table.appendChild(emailHeader);

            //Creates an empty array object to hold possible rows
            let rows = [];

            //Iterates the users array
            users.forEach((user, index) => {

                //Creates a table row element
                let tr = document.createElement('tr');

                //Creates table cell elements for individual items
                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                let td3 = document.createElement('td');
                let btnTd = document.createElement('td');

                //Sets the text for all the cells created above
                td3.innerText = index + 1;
                td1.innerText = user.username;
                td2.innerText = user.email;

                //Creates a button to delete a user from the table
                let deleteBtn = document.createElement('button');

                //Sets the properties and attributes of the button
                deleteBtn.innerText = 'Delete';
                deleteBtn.classList = 'delete';
                deleteBtn.setAttribute('id', index);

                //Adds an event listenter to the button to handle user deletion
                deleteBtn.addEventListener('click', handleDeleteUser)

                //Appends the button and the cells created above
                btnTd.appendChild(deleteBtn)
                tr.appendChild(td3);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(btnTd);

                //Done with creating a table row for a single user and adds the row to rows array
                rows.push(tr);

            });

            //Iterates the rows array and appends each row to the table 
            rows.forEach(row => {
                table.appendChild(row)
            })

            //Appends the table element to the body element
            document.body.appendChild(table)
        } else {
            return
        }



    }

    /**
     * 
     * @param {the button element clicked by the user} e 
     * 
     * handles user deletion from the list 
     */
    function handleDeleteUser(e) {
        let index1 = +e.toElement.id;
        let users = JSON.parse(localStorage.getItem('users'));
        let newUsers = users.filter((user, index) => {
            return index !== index1
        });
        localStorage.setItem('users', JSON.stringify(newUsers));

        refreshPage()

    }

    //A function to refresh the page after deleting a user
    function refreshPage() {
        window.location = '';
    }
})()