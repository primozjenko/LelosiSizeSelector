$(document).ready(function () {
    let currentStep = 1;

    function showStep(step) {
        console.log("Showing step:", step);
        $('.step').removeClass('active');
        $(`#step${step}`).addClass('active');
    }

    $('.next-step').click(function () {
        if (currentStep < 6) {
            currentStep++;
            showStep(currentStep);
        } else if (currentStep === 6) {
            calculateSize(); // Calculate size before moving to step 7
            currentStep++;
            showStep(currentStep);
        }
    });

    $('.prev-step').click(function () {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    $('#findSizeButton').click(function () {
        $('#sizeFinderSteps').toggle();
    });

    function calculateSize() {
        console.log("Calculating size...");
        const height = parseInt($('#height').val());
        const weight = parseInt($('#weight').val());
        const bodyShape = $('#bodyShape').val();
        const hipShape = $('#hipShape').val();
        const age = parseInt($('#age').val());
        const fitPreference = parseInt($('#fitPreference').val());
        const usualSize = $('#usualSize').val();

        let size = '';

        // Base size calculation based on height and weight
        if (height < 160) {
            if (weight < 50) size = 'XXS';
            else if (weight < 55) size = 'XS';
            else if (weight < 60) size = 'S';
            else if (weight < 70) size = 'M';
            else if (weight < 80) size = 'L';
            else size = 'XL';
        } else if (height < 170) {
            if (weight < 55) size = 'XS';
            else if (weight < 60) size = 'S';
            else if (weight < 65) size = 'M';
            else if (weight < 75) size = 'L';
            else if (weight < 85) size = 'XL';
            else size = '2XL';
        } else {
            if (weight < 60) size = 'S';
            else if (weight < 70) size = 'M';
            else if (weight < 80) size = 'L';
            else if (weight < 90) size = 'XL';
            else size = '2XL';
        }

        // Adjust size based on body shape
        if (bodyShape === 'raven' && hipShape === 'ozki') {
            size = adjustSize(size, -1);
        } else if (bodyShape === 'zaobljen' && hipShape === 'siri') {
            size = adjustSize(size, 1);
        }

        // Adjust size based on fit preference
        size = adjustSize(size, fitPreference - 2);

        console.log("Calculated size:", size);
        $('#sizeResult').text(`Priporočena velikost: ${size}`);
        console.log("Size result updated");
    }

    function adjustSize(size, adjustment) {
        const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', '2XL'];
        let index = sizes.indexOf(size) + adjustment;
        if (index < 0) index = 0;
        if (index >= sizes.length) index = sizes.length - 1;
        return sizes[index];
    }
});
