# Linea Dentale - Django Backend

Siga os passos abaixo para configurar e executar o projeto.

1. Crie o ambiente virtual:
   - **Linux:** `python3 -m venv env`
   - **Windows:** `python -m venv env`

2. Ative o ambiente virtual:
   - **Linux:** `source env/bin/activate`
   - **Windows:** `env\\Scripts\\activate`

3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```

4. Aplique as migrações do banco de dados:
   ```bash
   python manage.py migrate
   ```

5. Inicie o servidor backend de desenvolvimento:
   ```bash
   python manage.py runserver
   ```
   
