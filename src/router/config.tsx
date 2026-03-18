import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/home/page'));
const CarrinhoPage = lazy(() => import('../pages/carrinho/page'));
const DadosPessoaisPage = lazy(() => import('../pages/checkout/dados-pessoais/page'));
const EnderecoPage = lazy(() => import('../pages/checkout/endereco/page'));
const PagamentoPage = lazy(() => import('../pages/checkout/pagamento/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/carrinho',
    element: <CarrinhoPage />,
  },
  {
    path: '/checkout/dados-pessoais',
    element: <DadosPessoaisPage />,
  },
  {
    path: '/checkout/endereco',
    element: <EnderecoPage />,
  },
  {
    path: '/checkout/pagamento',
    element: <PagamentoPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;