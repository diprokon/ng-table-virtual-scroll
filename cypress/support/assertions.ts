function inRange(value: number, min: number, max: number): boolean {
  return min <= value && value <= max;
}

function isInViewport(_chai: Chai.ChaiStatic, utils: Chai.ChaiUtils) {
  function assertIsInViewport(this: Chai.AssertionStatic, containerSelector?: string) {
    const subject = this._obj;
    const container = containerSelector ? Cypress.$(containerSelector).get(0) : window.document.documentElement
    const containerRect = container.getBoundingClientRect()
    const rect = subject[0].getBoundingClientRect();

    this.assert(
      inRange(rect.top, containerRect.top, containerRect.bottom) &&
      inRange(rect.bottom, containerRect.top, containerRect.bottom) &&
      inRange(rect.left, containerRect.left, containerRect.right) &&
      inRange(rect.right, containerRect.left, containerRect.right),
      'expected #{this} to be in viewport',
      'expected #{this} to not be in viewport',
      this._obj
    );
  }

  chai.Assertion.addMethod('inViewport', assertIsInViewport);
}

chai.use(isInViewport);


declare global {
  namespace Cypress {
    interface Chainer<Subject> {
      (chainer: 'be.inViewport', containerSelector?: string): Chainable<Subject>
      (chainer: 'not.be.inViewport', containerSelector?: string): Chainable<Subject>
    }
  }
}

export {};
