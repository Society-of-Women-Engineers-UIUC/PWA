const directoryContainer = document.getElementById("points-container");

export const setupPoints = (user) => {
    let html = '';
    
    console.log('setupPoints running');
    
    if (user == null) {
        html = `
            <h2>Login to view points</h2>
        `;
    } else {
        html = `
            <h2>Points page under construction</h2>
        `; 
    }
    directoryContainer.innerHTML = html;
}