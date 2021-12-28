import { v4 as uuid } from 'uuid';

describe('Advertisement scenarios', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:4200/');
    cy.get('[data-e2e="email"]').type("testuser@testuser.com");
    cy.get('[data-e2e="password"]').type("testuser@testuser.com");
    cy.get('[data-e2e="submit"]').click();
    
  });

  it('should add advertisement', () => {
    cy.intercept('POST', '**/api/advertisements').as('addAdvertisement')
    const title = `title${uuid()}`;
    const description = `description${uuid()}`;
    const contact = `contact${uuid()}`;
    const address = `address${uuid()}`;
    
    cy.get('[data-e2e="add"]').click();
    cy.get('[data-e2e="title"]').type(title);
    cy.get('[data-e2e="description"]').type(description);
    cy.get('[data-e2e="contact"]').type(contact);
    cy.get('[data-e2e="address"]').type(address);

    cy.get('[data-e2e="submit"]').click();

    cy.wait("@addAdvertisement").then(res=>{
      const guid = res.response.body.guid;
      const _title = res.response.body.title;
      const _description = res.response.body.description;
      const _contact = res.response.body.contact;
      const _address = res.response.body.address;

      cy.wrap(guid).should('not.equal','');
      cy.url().should('include', `/advertisement/${guid}`);
      cy.wrap(res).its('response.statusCode').should('eq', 200)
      cy.wrap(_title).should('equal', title);
      cy.wrap(_description).should('equal', description);
      cy.wrap(_contact).should('equal', contact);
      cy.wrap(_address).should('equal', address);
    })
  
    cy.get('[data-e2e="edit"]').should('not.be.disabled');
    cy.get('[data-e2e="delete"]').should('not.be.disabled');

    cy.get('[data-e2e="title"]').contains(title);
    cy.get('[data-e2e="description"]').contains(description);
    cy.get('[data-e2e="contact"]').contains(contact);
    cy.get('[data-e2e="address"]').contains(address);
  })

  it('should edit advertisement',()=>{
    const title = `title${uuid()}`;
    const description = `description${uuid()}`;
    const contact = `contact${uuid()}`;
    const address = `address${uuid()}`;
    
    cy.get('[data-e2e="add"]').click();
    cy.get('[data-e2e="title"]').type(`title${uuid()}`);
    cy.get('[data-e2e="description"]').type("description");
    cy.get('[data-e2e="contact"]').type("contact");
    cy.get('[data-e2e="address"]').type("address");
    cy.get('[data-e2e="submit"]').click().wait(100);
    let guid = ''
    cy.url().then(url=> {
      url = url.split('/');
      guid = url[url.length-1];
      cy.intercept('PUT', `**/api/advertisements/${guid}`).as('editAdvertisement');
    });
    cy.get('[data-e2e="edit"]').click();

    cy.get('[data-e2e="title"]').clear().type(title);
    cy.get('[data-e2e="description"]').clear().type(description);
    cy.get('[data-e2e="contact"]').clear().type(contact);
    cy.get('[data-e2e="address"]').clear().type(address);

    cy.get('[data-e2e="submit"]').click();
    cy.wait('@editAdvertisement').then(res=>{
      const _title = res.response.body.title;
      const _description = res.response.body.description;
      const _contact = res.response.body.contact;
      const _address = res.response.body.address;

      cy.url().should('include', `/advertisement/${guid}`);
      cy.wrap(res).its('response.statusCode').should('eq', 200)
      cy.wrap(_title).should('equal', title);
      cy.wrap(_description).should('equal', description);
      cy.wrap(_contact).should('equal', contact);
      cy.wrap(_address).should('equal', address);
    })
    
    cy.get('[data-e2e="title"]').should('contain.text',title);
    cy.get('[data-e2e="description"]').should('contain.text',description);
    cy.get('[data-e2e="contact"]').should('contain.text',contact);
    cy.get('[data-e2e="address"]').should('contain.text',address);
    
  })

  it('should delete advertisement',()=>{
    const title = `title${uuid()}`;
    const description = `description${uuid()}`;
    const contact = `contact${uuid()}`;
    const address = `address${uuid()}`;
    
    cy.get('[data-e2e="add"]').click();
    cy.get('[data-e2e="title"]').type(title);
    cy.get('[data-e2e="description"]').type(description);
    cy.get('[data-e2e="contact"]').type(contact);
    cy.get('[data-e2e="address"]').type(address);

    cy.get('[data-e2e="submit"]').click().wait(10);
    let guid = ''
    cy.url().then(url=> {
      url = url.split('/');
      guid = url[url.length-1];
      cy.intercept('DELETE', `**/api/advertisements/${guid}`).as('deleteAdvertisement');
    });

    cy.get('[data-e2e="delete"]').click();
    cy.wait('@deleteAdvertisement').its('response.statusCode').should('eq', 200);
    cy.location().its('pathname').should('eq', '/');
  })
})