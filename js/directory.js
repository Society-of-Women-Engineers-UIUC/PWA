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
            const userCard = `
                <div class="user-cards">
                    <div class="card">
                        <div class="frame1">
                            <h4>${user.name}</h4>
                        </div>
                </div>
            `;

            html += userCard;
        })   
    }
    directoryContainer.innerHTML = html;
}