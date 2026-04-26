interface ConfirmDeleteModalProps {
  productName: string;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export function ConfirmDeleteModal({
  productName,
  onClose,
  onConfirm,
  isDeleting,
}: ConfirmDeleteModalProps) {
  return (
    <div className="modal-backdrop">
      <div className="confirm-card">
        <div className="confirm-icon">!</div>

        <h2>Excluir produto?</h2>

        <p>
          Você está prestes a excluir <strong>{productName}</strong>. Essa ação
          não poderá ser desfeita.
        </p>

        <div className="modal-actions">
          <button type="button" className="secondary-button" onClick={onClose}>
            Cancelar
          </button>

          <button
            type="button"
            className="delete-button"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Excluindo...' : 'Excluir produto'}
          </button>
        </div>
      </div>
    </div>
  );
}