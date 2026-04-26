import { useEffect, useState } from 'react';
import { api } from '../api/client';
import type { Category, Product } from '../types/product';

interface ProductModalProps {
  product?: Product | null;
  onClose: () => void;
  onSaved: () => void;
}

export function ProductModal({ product, onClose, onSaved }: ProductModalProps) {
  const isEditing = Boolean(product);

  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState(product?.name ?? '');
  const [description, setDescription] = useState(product?.description ?? '');
  const [price, setPrice] = useState(product ? String(product.price) : '');
  const [categoryId, setCategoryId] = useState(
    product?.categories[0]?.category.id ?? '',
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      const response = await api.get<Category[]>('/category');
      setCategories(response.data);
    }

    fetchCategories();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!categoryId) {
      alert('Selecione uma categoria');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name,
        description,
        price: Number(price),
        categoryIds: [categoryId],
      };

      if (product) {
        await api.patch(`/product/${product.id}`, payload);
      } else {
        await api.post('/product', payload);
      }

      onSaved();
      onClose();
    } catch (error) {
      console.error(error);
      alert(isEditing ? 'Erro ao editar produto' : 'Erro ao criar produto');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <span className="eyebrow">
              {isEditing ? 'Editar produto' : 'Novo produto'}
            </span>
            <h2>{isEditing ? 'Editar produto' : 'Cadastrar produto'}</h2>
          </div>

          <button type="button" className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Nome
            <input
              required
              value={name}
              placeholder="Ex: Notebook Lenovo"
              onChange={(event) => setName(event.target.value)}
            />
          </label>

          <label>
            Descrição
            <textarea
              value={description}
              placeholder="Descrição do produto"
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>

          <label>
            Preço
            <input
              required
              min="0"
              step="0.01"
              type="number"
              value={price}
              placeholder="Ex: 3500"
              onChange={(event) => setPrice(event.target.value)}
            />
          </label>

          <label>
            Categoria
            <select
              required
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
            >
              <option value="">Selecione uma categoria</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancelar
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? 'Salvando...'
                : isEditing
                  ? 'Salvar alterações'
                  : 'Salvar produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}