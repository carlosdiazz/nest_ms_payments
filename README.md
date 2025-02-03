# PAYMENTS MS

## DEV

1. Instalar dependencias
2. Crear archivo `.env` basado en el `.env.template`
3. Asegurarse tener correindo los demas microservicios
4. Ejecutar `npm run dev`

## Poner LocalHost como WebHook
Correr `hookdeck listen 3000  stripe-to-local`

## Poenr Stripe a correr
Correr `stripe listen --forward-to localhost:3000/api/payments/webhook`