
describe('intégration', () => {
  
  it('should call api then create result', () => {
    cy.intercept('GET','http://localhost:3000/data').as('get')
    cy.visit('http://localhost:9000')
    cy.wait('@get')
    cy.get('table').contains('Nom')
    cy.get('table').contains('Company')
    cy.get('table').contains('Jacobson')
    cy.get('table').contains('Henson')
    cy.get('table').contains(38)
    cy.get('table').contains('blue')
    cy.get('table').contains('DELPHIDE')
    cy.get('table').contains('henson.jacobson@delphide.org')
  })

  it('should containe all element if searched by age is not match', () => {
    cy.intercept('GET','http://localhost:3000/data').as('get')
    cy.visit('http://localhost:9000?age=15-20')// age range not match
    cy.wait('@get')
    cy.get('table').contains('Age')
    cy.get('table').contains(38)
  })

  it('should containe all element if searched by eyes color is not match', () => {
    cy.intercept('GET','http://localhost:3000/data').as('get')
    cy.visit('http://localhost:9000?eyeColor=red')// eyes color not match
    cy.wait('@get')
    cy.get('table').contains('Couleur des yeux')
    cy.get('table').contains('blue')
  })

})