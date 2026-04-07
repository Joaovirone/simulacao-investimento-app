InvestSim 
O InvestSim é uma aplicação Fullstack de simulação de investimentos. O projeto permite calcular a evolução patrimonial baseada em juros compostos, oferecendo visualizações gráficas e indicadores financeiros em tempo real.

Arquitetura e Estrutura de Pastas
O projeto é estruturado como um monorepo, utilizando Docker para orquestrar os serviços de Frontend, Backend e Banco de Dados.

.
├── backend/             # API Node.js + Prisma ORM
│   ├── prisma/          # Schema e Migrations do Banco
│   └── src/             # Lógica do servidor e cálculos
├── frontend/            # Next.js (App Router) + Tailwind + Recharts
│   └── src/app/         # Páginas e componentes do Dashboard
├── docker-compose.yml   # Orquestração dos containers
└── README.md


Como Subir o Sistema
Certifique-se de ter o Docker e o Docker Compose instalados.

Clonar o repositório:
git clone https://github.com/Joaovirone/simulacao-investimento-app.git
cd simulacao-investimento-app


Subir os serviços:
Este comando irá construir as imagens e subir os containers do Banco de Dados (PostgreSQL), Backend e Frontend.

docker compose up --build -d

Mapeamento de Portas:
Frontend: http://localhost:3000
Backend: http://localhost:3333 (API)


Fluxo de Trabalho Git (Boas Práticas)
Este projeto foi desenvolvido de forma colaborativa e segue um padrão rigoroso de versionamento para manter o histórico organizado.

Padrão de Branching
Sempre crie uma nova branch para cada funcionalidade ou correção, seguindo a ordem numérica e a descrição da tarefa:

# Exemplo: Criar branch para nova funcionalidade
git checkout -b 01-implementando-login

# Exemplo: Criar branch para ajuste de gráficos
git checkout -b 02-ajuste-graficos-recharts

Sincronização com o Repositório Remoto
Após criar a branch localmente, lembre-se de definir o rastreamento no primeiro push:

git push -u origin nome-da-branch
