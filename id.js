document.addEventListener('DOMContentLoaded', function () {
    const idForm = document.getElementById('idg');
    const generateBtn = document.getElementById('download-btn');
    const idCard = document.getElementById('card');
    const qrContainer = document.getElementById('qr');
    const idBody = document.getElementById('id-body');

    function generateIDCard(event) {
        event.preventDefault();

        const name = idForm.querySelectorAll('input[type="text"]')[0].value;
        const rollNumber = idForm.querySelectorAll('input[type="number"]')[0].value;
        const group = idForm.querySelectorAll('input[type="text"]')[1].value;
        const year = idForm.querySelectorAll('input[type="number"]')[1].value;

        // Basic validation
        if (!name || !rollNumber || !group || !year) {
            alert("Please fill in all fields.");
            return;
        }

        // Set the values in the ID card
        idBody.querySelector('h2:first-of-type').textContent = name;
        idBody.querySelector('p:first-of-type').textContent = rollNumber;
        idBody.querySelector('h2:last-of-type').textContent = group;
        idBody.querySelector('p:last-of-type').textContent = year;

        // Generate the QR code
        qrContainer.innerHTML = '';
        $(qrContainer).qrcode({
            text: `Name: ${name}, Roll Number: ${rollNumber}, Group: ${group}, Year: ${year}`,
            width: 128,
            height: 128
        });
    }

    // Generate the ID card when the button is clicked
    generateBtn.addEventListener('click', generateIDCard);

    // Download the ID card as an image
    const downloadImageBtn = document.getElementById('download');
    downloadImageBtn.addEventListener('click', function () {
        // Check if the ID card has valid data
        const name = idBody.querySelector('h2:first-of-type').textContent;
        const rollNumber = idBody.querySelector('p:first-of-type').textContent;
        const group = idBody.querySelector('h2:last-of-type').textContent;
        const year = idBody.querySelector('p:last-of-type').textContent;

        // Validate that there is data in the ID card
        if (name === '@haneef' && rollNumber === '1234' && group === 'xyz' && year === '1234') {
            alert("Please Enter Details.");
            return; // Exit the function if the ID card is empty
        }

        // Proceed to download the ID card as an image
        htmlToImage.toPng(idCard)
            .then(function (dataUrl) {
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = 'id-card.png';
                link.click();
            })
            .catch(function (error) {
                console.error('Error while generating the image:', error);
            });
    });

    // Clear form and reset the ID card for a new entry
    const createNewBtn = document.getElementById('createnew');
    createNewBtn.addEventListener('click', function () {
        idForm.reset(); // Clear the form
        idBody.querySelector('h2:first-of-type').textContent = '@haneef';
        idBody.querySelector('p:first-of-type').textContent = '1234';
        idBody.querySelector('h2:last-of-type').textContent = 'xyz';
        idBody.querySelector('p:last-of-type').textContent = '1234';
        qrContainer.innerHTML = ''; // Clear QR code
    });
});
