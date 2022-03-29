import { authTokenCookieName } from "../../src/utils/utils";

const apiHost = 'norma.nomoreparties.space';

describe('constructor works correctly (logged user)', function () {
    before(function () {
        cy.setCookie(authTokenCookieName, 'token');
        cy.visit('/');

        cy.intercept({
            method: 'GET',
            url: '/api/ingredients',
            hostname: apiHost,
        }, { fixture: 'ingredients.json' });

        cy.intercept({
            method: 'GET',
            url: '/api/auth/user',
            hostname: apiHost,
        }, { fixture: 'user.json' });

    });

    it('should load all avalaible ingredients', function () {
        cy.get('[class^=ingredient-element_ingredient_container__]').should('have.length', 15);
    });

    it('should render first avalaible ingredient', function () {
        cy.get('[class^=ingredient-element_ingredient_container__]').first().as('ingredientContainer');
        cy.get('@ingredientContainer').find('span').contains('Краторная булка N-200i');
        cy.get('@ingredientContainer').find('img').should('be.visible').and('have.attr', 'src', 'https://code.s3.yandex.net/react/code/bun-02.png')
        cy.get('@ingredientContainer').find('span').contains('1255');
        cy.get('@ingredientContainer').find('p').contains('0');
        cy.get('@ingredientContainer').find('svg');
    });

    it('should show ingredient modal', function () {
        cy.get('[class^=ingredient-element_ingredient_container__]').first().click();
        cy.get('[class^=modal_modal_confirm__]').as('modal').should('be.visible');
        cy.get('@modal').find('h3').contains('Краторная булка N-200i');
        cy.get('@modal').find('img').should('be.visible').and('have.attr', 'src', 'https://code.s3.yandex.net/react/code/bun-02-large.png')
        cy.get('@modal').find('[class*=ingredient-details_nutrition_value]').as('valueContaners')
        cy.get('@valueContaners').contains('Калории, ккал').parent().find('span').contains('420');
        cy.get('@valueContaners').contains('Белки, г').parent().find('span').contains('80');
        cy.get('@valueContaners').contains('Жиры, г').parent().find('span').contains('24');
        cy.get('@valueContaners').contains('Углеводы, г').parent().find('span').contains('53');
        cy.get('@modal').find('svg').click();
        cy.get('@modal').should('not.exist');
    });

    it('should add bun by dnd', function () {
        cy.get('[class^=burger-ingredients_scroll__]').first().as('scrollContainer');
        cy.get('@scrollContainer')
            .contains('Булки')
            .parent()
            .find('[class^=ingredient-element_ingredient_container__]')
            .as('bunsContainer');

        cy.get('@bunsContainer')
            .find('span')
            .contains('Флюоресцентная булка R2-D3')
            .parent()
            .as('ingredientContainer');

        cy.get('@ingredientContainer').find('p').contains('0').as('counter');
        cy.get('@ingredientContainer').trigger('dragstart');
        cy.get('[class^=burger-constructor_scroll__]').parent()
            .trigger('dragenter', { force: true })
            .trigger('dragover', { force: true })
            .trigger('drop', { force: true })
            .trigger('dragend', { force: true });

        cy.get('@counter').should('contain', '2');
    });

    it('should add sauce by dnd', function () {
        cy.get('[class^=burger-ingredients_scroll__]').first().as('scrollContainer');
        cy.get('@scrollContainer')
            .contains('Соусы')
            .parent()
            .find('[class^=ingredient-element_ingredient_container__]')
            .as('saucesContainer');

        cy.get('@saucesContainer')
            .find('span')
            .contains('Соус фирменный Space Sauce')
            .parent()
            .as('ingredientContainer');

        cy.get('@ingredientContainer').find('p').contains('0').as('counter');
        cy.get('@ingredientContainer').trigger('dragstart');
        cy.get('[id=ingredients]')
            .trigger('dragenter', { force: true })
            .trigger('dragover', { force: true })
            .trigger('drop', { force: true })
            .trigger('dragend', { force: true });

        cy.get('@counter').should('contain', '1');
    });

    it('should add main by dnd', function () {
        cy.get('[class^=burger-ingredients_scroll__]').first().as('scrollContainer');
        cy.get('@scrollContainer')
            .contains('Начинки')
            .parent()
            .find('[class^=ingredient-element_ingredient_container__]')
            .as('mainsContainer');

        cy.get('@mainsContainer')
            .find('span')
            .contains('Мясо бессмертных моллюсков Protostomia')
            .parent()
            .as('ingredientContainer');

        cy.get('@ingredientContainer').find('p').contains('0').as('counter');
        cy.get('@ingredientContainer').trigger('dragstart');
        cy.get('[id=ingredients]')
            .trigger('dragenter', { force: true })
            .trigger('dragover', { force: true })
            .trigger('drop', { force: true })
            .trigger('dragend', { force: true });

        cy.get('@counter').should('contain', '1');
    });

    it('should send order', function () {

        cy.intercept({
            method: 'POST',
            url: '/api/orders',
            hostname: apiHost,
        }, { fixture: 'order.json' }).as('sendOrder');

        cy.get('button').contains('Оформить заказ').click();

        cy.wait('@sendOrder').then(
            (i) => {
                cy.fixture('send-order-request.json').then(reqestData => {
                    const ingredients = i.request.body.ingredients;
                    if (ingredients.length === 4
                        && ingredients[0] === reqestData.ingredients[0]
                        && ingredients[1] === reqestData.ingredients[1]
                        && ingredients[2] === reqestData.ingredients[2]
                        && ingredients[3] === reqestData.ingredients[3]
                    ) {
                        //test ok
                    } else {
                        throw new Error("input body does not match")
                    }
                })
            }
        )

        cy.get('[class^=modal_modal_confirm__]').as('modal').should('be.visible');
        cy.get('@modal').find('div').contains('12435');
        cy.get('@modal').find('svg').click();
        cy.get('@modal').should('not.exist');
        cy.get('[id=ingredients]').children().should('have.length', 0);
    });

});

export default {}
