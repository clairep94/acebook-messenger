import UploadImage from './UploadImage'
const navigate = () => { }

describe("UploadImage", () => {
    it("Calls the /upload_image endpoint and uploads an image", () => {
        window.localStorage.setItem("token", "fakeToken")

        cy.intercept('POST', '/upload_image', (req) => {
            // Generate a fake Cloudinary URL
            const imageUrl = `https://res.cloudinary.com/fakepath/${Date.now()}.png`;

            req.reply({
                statusCode: 200,
                body: {
                    imageUrl
                }
            })
        }).as("postImage")

        cy.mount(<UploadImage navigate={navigate} />)

        cy.get('input[type=file]').attachFile('testImage.png'); // replace with a test image file name
        cy.get('button[type=submit]').click();

        cy.wait("@postImage").then(() => {
            cy.get('img').should('have.attr', 'src').and('include', 'res.cloudinary.com');
        })
    })
})