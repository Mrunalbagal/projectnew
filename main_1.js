
var myMembers = data.results[0].members;
console.log(myMembers);



var getStates = [];
for (var i = 0; i < myMembers.length; i++) {
    getStates.push(myMembers[i].state);
}
var removeDupStates = getStates.filter(function (x, i, self) {
    return self.indexOf(x) === i;
});
var filterStates = removeDupStates.sort(function (a, b) {
    return (b < a ? 1 : -1);
});
console.log(filterStates);


var myTable = document.getElementById("members-data");


function getMembers(members) {
    myTable.innerHTML = "";

    for (i = 0; i < members.length; i++) {
        var fullName;
        if (members[i].middle_name == null) {
            fullName = members[i].first_name + " " + members[i].last_name;
        } else {
            fullName = members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name;
        }

        var myRow = document.createElement("tr");
        myRow.insertCell().innerHTML = '<a href=' + members[i].url + ' target="_blank";>' + fullName + '</a>';
        myRow.insertCell().innerHTML = members[i].party;
        myRow.insertCell().innerHTML = members[i].state;
        myRow.insertCell().innerHTML = members[i].seniority;
        myRow.insertCell().innerHTML = members[i].votes_with_party_pct + "%";
        myTable.append(myRow);
    }
}
getMembers(myMembers);


function setFilter() {
    var selectElement = document.getElementById("filter_state");
    for (var i = 0; i < filterStates.length; i++) {
        var makeOption = document.createElement("option");
        makeOption.value = filterStates[i];
        makeOption.innerText = filterStates[i];
        selectElement.appendChild(makeOption);
    }
}
setFilter();


function getChecked() {
    
    var checkboxChecked =
        Array.from(document.querySelectorAll('input[name=party]:checked')).map(elt => elt.value);
    console.log(checkboxChecked);
    var filterChecked = document.getElementById("filter_state").value;
    console.log(filterChecked);

    var filteredMembers = []
    for (var i = 0; i < myMembers.length; i++) {

        if (filterChecked == "" && checkboxChecked.length < 1) {
            filteredMembers.push(myMembers[i]);

        } else if (filterChecked == "") {
            if (checkboxChecked.includes(myMembers[i].party)) {
                filteredMembers.push(myMembers[i]);
            }

        } else if (checkboxChecked.length < 1) {
            if (myMembers[i].state == filterChecked) {
                filteredMembers.push(myMembers[i]);
            }

        } else {
           
            if (myMembers[i].state == filterChecked && checkboxChecked.includes(myMembers[i].party)) {
                filteredMembers.push(myMembers[i]);
            }
        }
    }
    console.log(filteredMembers)
    getMembers(filteredMembers)
}

getChecked()
