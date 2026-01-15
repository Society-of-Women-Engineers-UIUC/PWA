const directoryContainer = document.getElementById("directory-container");

export const setupUsers = (data) => {
    let html = '';
    
    if (data == null) {
        html = `
            <h2>Login to view directory</h2>
        `;
    } else {
        data.forEach( doc => {
            const user = doc.data();
            
            var userCard = ``;
            if (user.committee != "") {
                userCard = `
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
            } else {
                userCard = `
                    <div class="user-cards">
                        <div class="card">
                            <div class="row2">
                                <h4>${user.name} - ${user.email}</h4>
                            </div>
                        </div>
                    </div>
                `;
            }

            html += userCard;
        })   
    }
    directoryContainer.innerHTML = html;
}