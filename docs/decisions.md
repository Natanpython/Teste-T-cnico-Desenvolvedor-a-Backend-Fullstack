# Decisões Técnicas

## Uso de UUID

Mantido como identificador principal por segurança e escalabilidade.

## Campo `code`

Adicionado para melhorar UX, permitindo identificação numérica simples (#1, #2...).

## Modal em vez de páginas

Melhora a experiência do usuário e reduz navegação desnecessária.

## Filtro com debounce

Evita múltiplas requisições desnecessárias ao backend.

## Testes E2E

Utilizado Playwright para validar fluxo completo do sistema.