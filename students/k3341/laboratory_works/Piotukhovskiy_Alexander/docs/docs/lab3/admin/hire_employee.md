# Нанять сотрудника

### Описание

Этот эндпоинт позволяет нанять нового сотрудника в гостиницу, создавая запись сотрудника и его трудовой договор.

---

### URL

`POST /employees/manage`

---

### Параметры запроса

Запрос принимает JSON-объект в теле запроса.

| Параметр          | Тип данных    | Обязательный | Описание                                                                 |
|--------------------|---------------|--------------|--------------------------------------------------------------------------|
| `passport_number`  | `string`      | Да           | Номер паспорта сотрудника (уникальный).                                  |
| `first_name`       | `string`      | Да           | Имя сотрудника.                                                          |
| `last_name`        | `string`      | Да           | Фамилия сотрудника.                                                      |
| `middle_name`      | `string/null` | Нет          | Отчество сотрудника.                                                     |
| `position_id`      | `integer`     | Да           | ID должности, на которую принимается сотрудник.                          |
| `contract_type`    | `string`      | Да           | Тип контракта: `FIXED_TERM` (срочный), `PERMANENT` (бессрочный), `CIVIL_CONTRACT` (гражданский договор). |
| `start_date`       | `string`      | Да           | Дата начала контракта в формате `YYYY-MM-DD`.                            |
| `end_date`         | `string/null` | Нет          | Дата окончания контракта (не обязательна для `PERMANENT`).               |

---

### Пример запроса

```http
POST /employees/manage
Content-Type: application/json

{
    "passport_number": "1234567890",
    "first_name": "Иван",
    "last_name": "Иванов",
    "middle_name": "Сергеевич",
    "position_id": 2,
    "contract_type": "FIXED_TERM",
    "start_date": "2024-01-01",
    "end_date": "2025-01-01"
}
```

---

### Успешный ответ (201)

```json
{
    "id": 1,
    "contract_type": "FIXED_TERM",
    "employee_id": 10,
    "employee_first_name": "Иван",
    "employee_last_name": "Иванов",
    "employee_middle_name": "Сергеевич",
    "start_date": "2024-01-01",
    "end_date": "2025-01-01",
    "position_id": 2,
    "position_name": "Уборщик"
}
```

---

### Ошибки

#### Ошибки валидации данных (422)

Пример ответа:

```json
{
    "detail": "У сотрудника уже есть активный контракт."
}
```

| Код   | Описание                                                         |
|-------|-----------------------------------------------------------------|
| 422   | Ошибки валидации данных. Например, дублирование паспорта или конфликт дат. |

---

### Примечания

- Если сотрудник с указанным номером паспорта уже существует, система обновляет его данные (имя, фамилия, отчество) и создает новый контракт.
- Для контракта типа `PERMANENT` поле `end_date` не должно быть указано.
- Все контракты с указанным сотрудником, активные на момент начала нового контракта, будут завершены.