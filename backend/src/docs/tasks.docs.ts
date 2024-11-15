/**
 * @swagger
 * /tarefas:
 *   get:
 *     summary: Listar tarefas (incluindo filtro por status)
 *     description: Retorna uma lista de todas as tarefas, com opção de filtrá-las pelo status especificado.
 *     parameters:
 *       - name: status
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: ['pending', 'in_progress', 'done']
 *         description: |
 *           O status das tarefas a serem filtradas. Pode ser 'pending', 'in_progress' ou 'done'.
 *     responses:
 *       '200':
 *         description: Lista de tarefas obtida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarefas buscadas com sucesso!"
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       '500':
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /tarefas/add:
 *   post:
 *     summary: Cria uma nova tarefa
 *     description: Cria uma nova tarefa com os dados fornecidos. O `id` será gerado automaticamente pelo servidor.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nova Tarefa"
 *               description:
 *                 type: string
 *                 example: "Descrição da tarefa"
 *               status:
 *                 type: string
 *                 enum: ['pending', 'in_progress', 'done']
 *                 example: "pending"
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarefa criada com sucesso!"
 *                 id:
 *                   type: string
 *                   example: "b0fe77c9-1b68-45ac-a727-c3d2b9617b88"  # Exemplo de UUID gerado automaticamente
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro ao criar a tarefa
 */

/**
 * @swagger
 * /tarefas/{id}:
 *   get:
 *     summary: Retorna uma tarefa pelo ID.
 *     description: Busca uma tarefa específica no sistema pelo ID fornecido.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da tarefa que deve ser retornada.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Tarefa encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '404':
 *         description: Tarefa não encontrada.
 *       '500':
 *         description: Erro interno do servidor.
 *   put:
 *     summary: Atualiza uma tarefa existente.
 *     description: Atualiza uma tarefa específica pelo seu ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tarefa a ser atualizada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tarefa Atualizada"
 *               description:
 *                 type: string
 *                 example: "Descrição atualizada da tarefa"
 *               status:
 *                 type: string
 *                 enum: ["pending", "in_progress", "done"]
 *                 example: "done"
 *     responses:
 *       '200':
 *         description: Tarefa atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '400':
 *         description: Erro de validação dos dados.
 *       '404':
 *         description: Tarefa não encontrada.
 *       '500':
 *         description: Erro interno do servidor.
 *   patch:
 *     summary: Atualiza parcialmente uma tarefa.
 *     description: Atualiza apenas os campos fornecidos para uma tarefa específica pelo seu ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tarefa a ser atualizada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tarefa Parcialmente Atualizada"
 *               description:
 *                 type: string
 *                 example: "Descrição atualizada parcialmente"
 *               status:
 *                 type: string
 *                 enum: ["pending", "in_progress", "done"]
 *                 example: "in_progress"
 *     responses:
 *       '200':
 *         description: Tarefa atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       '400':
 *         description: Erro de validação dos dados.
 *       '404':
 *         description: Tarefa não encontrada.
 *       '500':
 *         description: Erro interno do servidor.
 *
 *
 */
