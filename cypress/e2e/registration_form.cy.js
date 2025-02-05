
describe('Registration Form', () => {
    beforeEach(() => {
        cy.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from failing the test
            return false;
        });
        cy.visit('/');
    });

    it('containing fields according to design', () => {
        cy.get('h1').should('contain', 'Practice Form')
        cy.get('h5').should('contain', 'Student Registration Form');
        cy.get('#userForm').should('be.visible');

        cy.get('#userName-label').should('contain', 'Name');
        cy.get('#userEmail-label').should('contain', 'Email');
        cy.contains('Gender').should('be.visible');
        cy.get('#userNumber-label').should('contain', 'Mobile(10 Digits)');
        cy.get('#dateOfBirth-label').should('contain', 'Date of Birth');
        cy.get('#subjects-label').should('contain', 'Subjects');
        // in the code id="subjects-label" is used 3 times for subjects, hobbies and picture
        cy.contains('Hobbies').should('be.visible'); // need to use id="hobbies-label" for hobbies
        cy.contains('Picture').should('be.visible'); // need to use id="picture-label" for picture
        cy.get('#currentAddress-label').should('contain', 'Current Address');
        cy.get('#stateCity-label').should('contain', 'State and City');

        cy.get('button').should('contain', 'Submit');
    });

    it('fields placeholder text', () => {
        cy.get('#firstName').should('have.attr', 'placeholder', 'First Name');
        cy.get('#lastName').should('have.attr', 'placeholder', 'Last Name');
        cy.get('#userEmail').should('have.attr', 'placeholder', 'name@example.com');  
        cy.get('#userNumber').should('have.attr', 'placeholder', 'Mobile Number');
        cy.get('#dateOfBirthInput').should('have.value', new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }));
        cy.get('#currentAddress').should('have.attr', 'placeholder', 'Current Address');
        cy.get('#state > div > div >.css-1wa3eu0-placeholder').should('have.text', 'Select State');
        cy.get('#city > div > div >.css-1wa3eu0-placeholder').should('have.text', 'Select City');
    }); 

    it('submitting the form - only required fields', () => {
        const firstName = 'John';
        const lastName = 'Doe';
        const mobileNumber = '1234567890';
        const genderList = ['Male', 'Female', 'Other'];
        const randomGender = genderList[Math.floor(Math.random() * genderList.length)];

        cy.get('#firstName').type(firstName);
        cy.get('#lastName').type(lastName);
        cy.get(`input[name="gender"][value="${randomGender}"]`).check({ force: true });
        cy.get('#userNumber').type(mobileNumber);
        cy.get('#submit').click();
        cy.get('.modal-content').should('be.visible');
        cy.get('.modal-header').should('contain', 'Thanks for submitting the form');
        cy.get('.modal-body').should('contain', firstName + ' ' + lastName);
        cy.get('.modal-body').should('contain', mobileNumber);
        cy.get('.modal-body').should('contain', new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long'})); // need to use correct format of Date? 
        cy.get('button').contains('Close').click({ force: true });
    });

    it('submitting the form without Mobile Number', () => {
        const firstName = 'John';
        const lastName = 'Doe';
        const genderList = ['Male', 'Female', 'Other'];
        const randomGender = genderList[Math.floor(Math.random() * genderList.length)];

        cy.get('#firstName').type(firstName);
        cy.get('#lastName').type(lastName);
        cy.get(`input[name="gender"][value="${randomGender}"]`).check({ force: true });
        cy.get('#submit').click();
        cy.get('#userNumber').should('have.css', 'border-color', 'rgb(220, 53, 69)'); 
    });
});