import asyncComponent from 'lib/asyncComponent';

export const HomePage = asyncComponent(() => import('./HomePage'));
export const AlertPage = asyncComponent(() => import( './AlertPage'));
export const EditorPage = asyncComponent(() => import( './EditorPage'));
export const ListPage = asyncComponent(() => import( './ListPage'));
export const NotFoundPage = asyncComponent(() => import( './NotFoundPage'));
export const DetailPage = asyncComponent(() => import( './DetailPage'));
export const PaymentPage = asyncComponent(() => import( './PaymentPage'));
export const ItemDetailPage = asyncComponent(() => import( './ItemDetailPage'));
export const ItemEditorPage = asyncComponent(() => import( './ItemEditorPage'));
export const LoginPage = asyncComponent(() => import( './LoginPage'));
export const SignupPage = asyncComponent(() => import( './SignupPage'));
export const CartPage = asyncComponent(() => import( './CartPage'));