/// <reference types="cypress" />
import PossessionProvider  from '../../../src/providers/possessionProvider';
describe('PossessionProvider delete', () => {
    const resource = "possessions";
    const nomPatrimoine = "testPatrimoine";
    const nomPossession = "testPossession";

    it('should delete a possession', () => {
        cy.intercept('DELETE', `/patrimoines/${nomPatrimoine}/possessions/${nomPossession}`, {
            statusCode: 204
        }).as('deletePossession');

        cy.wrap(PossessionProvider.delete(resource, nomPatrimoine, nomPossession))
            .its('success')
            .should('be.true');
        
        cy.wait('@deletePossession');
    });

    it('should handle errors', () => {
        cy.intercept('DELETE', `/patrimoines/${nomPatrimoine}/possessions/${nomPossession}`, {
            statusCode: 500
        }).as('deletePossessionError');

        cy.wrap(PossessionProvider.delete(resource, nomPatrimoine, nomPossession))
            .should('be.rejectedWith', Error);

        cy.wait('@deletePossessionError');
    });
});