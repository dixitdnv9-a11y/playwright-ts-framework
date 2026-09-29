import { HomePage } from '../pages/HomePage';
import { TestCasesPage } from '../pages/TestCasesPage';
import { ProductsPage } from '../pages/ProductsPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';
import { CartModal } from '../components/CartModal';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { HeaderComponent } from '../components/HeaderComponent';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import { OrderPlacedPage } from '../pages/OrderPlacedPage';
import { ContactUsPage } from '../pages/ContactUsPage';

export const pageFixtures = {
  homePage: async ({ page }, use) => { await use(new HomePage(page)); },
  testCasesPage: async ({ page }, use) => { await use(new TestCasesPage(page)); },
  productsPage: async ({ page }, use) => { await use(new ProductsPage(page)); },
  productDetailPage: async ({ page }, use) => { await use(new ProductDetailPage(page)); },
  cartPage: async ({ page }, use) => { await use(new CartPage(page)); },
  cartModal: async ({ page }, use) => { await use(new CartModal(page)); },
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  signupPage: async ({ page }, use) => { await use(new SignupPage(page)); },
  header: async ({ page }, use) => { await use(new HeaderComponent(page)); },
  checkoutPage: async ({ page }, use) => { await use(new CheckoutPage(page)); },
  paymentPage: async ({ page }, use) => { await use(new PaymentPage(page)); },
  orderPlacedPage: async ({ page }, use) => { await use(new OrderPlacedPage(page)); },
  contactUsPage: async ({ page }, use) => { await use(new ContactUsPage(page)); },
};
