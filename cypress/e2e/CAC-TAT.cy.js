describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('src/index.html');
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    preencherFormulario();
    cy.contains('Enviar').click()
    cy.get('span.success > strong')
    .should('contain.text', 'Mensagem enviada com sucesso.')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    preencherFormulario();
    cy.get('#email').as('email').clear().should('have.value', '')
    cy.get('@email').type('carlos.com.br')
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
  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#check input[id="phone-checkbox"]').check().should('be.checked')
    cy.contains('button','Enviar').click()
    cy.get('span.error > strong')
    .should('contain.text', 'Valide os campos obrigatórios!')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    preencherFormulario ()
    limparFormulario ()
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () =>{
    cy.contains('Enviar').click()
    cy.get('span.error > strong')
    .should('contain.text', 'Valide os campos obrigatórios!')
  })
  it('envia o formuário com sucesso usando um comando customizado' , () => {
    // const data = {
    //   firstName: 'Marcelo',
    //   lastName: 'Lima e Silva',
    //   email:  'marcelo_lima@gmail.com',
    //   text: 'ABCDEFGHIJKLMNOPQRSTUVWYXZ.'
    // }
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')

  })
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu índice' , () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })
  it('marca o tipo de atendimento "Feedback' , () => {
    cy.get('input[type="radio"]').check('feedback').should('be.checked')
  })
  it('marca cada tipo de atendimento' , () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
    // cy.get('input[type="radio"]').check('ajuda').should('be.checked')
    // cy.get('input[type="radio"]').check('elogio').should('be.checked')
    // cy.get('input[type="radio"]').check('feedback').should('be.checked')
  })
  it('marca ambos checkboxes, depois desmarca o último' , () => {
    cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
  })
  it.only('seleciona um arquivo da pasta fixtures' , () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
    })
  })
})

// Function
function preencherFormulario () {
  cy.get('input[id="firstName"]').as('firstName').should('be.visible').type('Carlos',{delay: 100})
  cy.get('@firstName').should('have.value','Carlos')
  cy.get('input[id="lastName"]').as('lastName').should('be.visible').type('Antonio',{delay: 100})
  cy.get('@lastName').should('have.value', 'Antonio')
  cy.get('input[id="email"]').as('email').should('be.visible').type('Carlos@gmail.com',{delay: 0})
  cy.get('@email').should('have.value', 'Carlos@gmail.com')
  const longText = Cypress._.repeat('ABCDEFGHIJKLMNOPQRSTUVWYXZ', 10)
  cy.get('textarea[id="open-text-area"]').as('openTextArea').should('be.visible').type(longText,{delay: 0})
}

function limparFormulario () {
  cy.get('@firstName').clear().should('be.empty')
  cy.get('@lastName').clear().should('have.value', '')
  cy.get('@email').clear().should('have.value', '')
  cy.get('@openTextArea').clear().should('be.empty')
}
