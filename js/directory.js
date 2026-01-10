const directoryContainer = document.getElementById("directory-container");

export const setupUsers = (data) => {
    let html = '';

    console.log('setupUsers running');
    
    if (data == null) {
        html = `
            <h1>Login to view directory</h1>
        `;
    } else {
        data.forEach( doc => {
            const user = doc.data();
            console.log(user);
            const userCard = `
                <div class="user-cards">
                    <div class="card">
                        <div class="row1">
                            <h4>${user.committee} - ${user.chair}</h4>
                        </div>
                        <div class="row2">
                            <h4>${user.name} - ${user.email}</h4>
                        </div>
                    </div>
                </div>
            `;

            html += userCard;
        })   
    }
    directoryContainer.innerHTML = html;
}