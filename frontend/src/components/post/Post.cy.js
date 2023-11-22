import Post from './Post'

describe("Post", () => {
  it('renders a post with a message', () => {
    cy.mount(<Post post={{ _id: 1, message: "Hello, world", user_id: { email: "test@example.com" } }} />);
    cy.get('[data-cy="post"]').should('contain.text', "Hello, world")
  })
})
