import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal';
import { ProductModal } from '../components/ProductModal';
import type { Product } from '../types/product';

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [nameFilter, setNameFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function fetchProducts(search?: string) {
  const normalizedSearch = search?.trim();

  setIsLoading(true);

  try {
    const response = await api.get<Product[]>('/product', {
      params: {
        search: normalizedSearch || undefined,
      },
    });

    setProducts(response.data);
  } catch (error) {
    console.error(error);
    setProducts([]);
  } finally {
    setIsLoading(false);
  }
}

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProducts(nameFilter);
    }, 400);

    return () => clearTimeout(timeout);
  }, [nameFilter]);

  function openCreateModal() {
    setSelectedProduct(null);
    setIsModalOpen(true);
  }

  function openEditModal(product: Product) {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedProduct(null);
    setIsModalOpen(false);
  }

  async function confirmDelete() {
    if (!productToDelete) return;

    setIsDeleting(true);

    try {
      await api.delete(`/product/${productToDelete.id}`);
      await fetchProducts(nameFilter);
      setProductToDelete(null);
    } catch (error) {
      console.error(error);
      alert('Erro ao excluir produto');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <div>
          <span className="eyebrow">Product Manager</span>
          <h1>Gerenciamento de produtos</h1>
          <p>Cadastre, filtre e organize produtos por categorias.</p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={openCreateModal}
        >
          Novo produto
        </button>
      </section>

      <form className="filter-card">
        <label htmlFor="name">Buscar por nome ou ID</label>

        <div className="filter-row">
          <input
            id="name"
            type="text"
            placeholder="Digite o nome ou ID do produto..."
            value={nameFilter}
            onChange={(event) => setNameFilter(event.target.value)}
          />
        </div>
      </form>

      <section className="products-grid">
        {isLoading && <p className="empty">Carregando produtos...</p>}

        {!isLoading && products.length === 0 && (
          <p className="empty">Nenhum produto encontrado.</p>
        )}

        {!isLoading &&
          products.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-header">
                <h2>{product.name}</h2>
                <span className="product-id">
                  ID{product.code}
                </span>
              </div>

              <p>{product.description || 'Sem descrição'}</p>

              <strong>
                {Number(product.price).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </strong>

              <div className="category-list">
                {product.categories.map((item) => (
                  <span key={item.category.id}>{item.category.name}</span>
                ))}
              </div>

              <div className="actions">
                <button type="button" onClick={() => openEditModal(product)}>
                  Editar
                </button>

                <button
                  type="button"
                  className="danger"
                  onClick={() => setProductToDelete(product)}
                >
                  Excluir
                </button>
              </div>
            </article>
          ))}
      </section>

      {isModalOpen && (
        <ProductModal
          product={selectedProduct}
          onClose={closeModal}
          onSaved={() => fetchProducts(nameFilter)}
        />
      )}

      {productToDelete && (
        <ConfirmDeleteModal
          productName={productToDelete.name}
          isDeleting={isDeleting}
          onClose={() => setProductToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </main>
  );
}