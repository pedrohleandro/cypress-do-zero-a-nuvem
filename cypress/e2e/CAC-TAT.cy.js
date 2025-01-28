describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('src/index.html');
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('input[id="firstName"]')
    .as('firstName')
    .should('be.visible')
    .type('Carlos',{delay: 100})
    cy.get('@firstName')
    .should('have.value','Carlos')
    cy.get('input[id="lastName"]')
    .as('lastName')
    .should('be.visible')
    .type('Antonio',{delay: 100})
    cy.get('@lastName')
    .should('have.value', 'Antonio')
    cy.get('input[id="email"]')
    .as('email')
    .should('be.visible')
    .type('Carlos@gmail.com',{delay: 100})
    cy.get('@email')
    .should('have.value', 'Carlos@gmail.com')
    cy.get('textarea[id="open-text-area"]')
    .as('openTextArea')
    .should('be.visible')
    .type('N/a',{delay: 100})
    cy.contains('Enviar').click()
    cy.get('span.success > strong')
    .should('contain.text', 'Mensagem enviada com sucesso.')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.contains('Enviar').click()
    cy.get('span.error > strong')
    .should('contain.text', 'Valide os campos obrigatórios!')
  })
  it('teste para validar que, se um valor não-numérico for digitado, seu valor continuará vazio', () => {
    cy.get('.field input[type="number"]')
    .as('numTelefone')
    .should('be.visible')
    .type('Inserindo Texto no Campo Numero',{delay: 100})
    // cy.get('@numTelefone')
    .invoke('val').should('be.empty');
  })
})
