


# API Documentation & Description
This API is developed to fulfill submission of Learn to Create Back-End Apps for Beginner Course from Dicoding Platform. This API build with Javascript and HAPI as Framework


<!-- 1. Create -->
# 1. Create / Store Product
 
 
 Request : 
- Method : POST
- Endpoint : /books
- Body Request
```json
{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
```
- Body Response Example
    - Success
    ```json
    {
        "status": "success",
        "message": "Buku berhasil ditambahkan",
        "data": {
            "bookId": "1L7ZtDUFeGs7VlEt"
        }
    }
    ```
    - Fail
    ```json
    {
        "status": "error",
        "message": failMsg
    }
    ```
## 


<!-- 2. Read -->
# 2. Get Books
 
Request : 
- Method : GET
- Endpoint : /books
- Body Response Example
```json
{
    "status": "success",
    "data": {
        "books": [
            {
                "id": "Qbax5Oy7L8WKf74l",
                "name": "Buku A",
                "publisher": "Dicoding Indonesia"
            },
            {
                "id": "1L7ZtDUFeGs7VlEt",
                "name": "Buku B",
                "publisher": "Dicoding Indonesia"
            },
            {
                "id": "K8DZbfI-t3LrY7lD",
                "name": "Buku C",
                "publisher": "Dicoding Indonesia"
            }
        ]
    }
}
```

<!-- 3. Read detail -->
# 3. Get Book Detail
 
 Request : 
- Method : GET
- Endpoint : /books/{bookId}
- Header : 
    - Content-Type: application/json
    - Accept : application/json
- Body Request
- Body Response Example
```json
{
    "status": "success",
    "data": {
        "book": {
            "id": "aWZBUW3JN_VBE-9I",
            "name": "Buku A Revisi",
            "year": 2011,
            "author": "Jane Doe",
            "summary": "Lorem Dolor sit Amet",
            "publisher": "Dicoding",
            "pageCount": 200,
            "readPage": 26,
            "finished": false,
            "reading": false,
            "insertedAt": "2021-03-05T06:14:28.930Z",
            "updatedAt": "2021-03-05T06:14:30.718Z"
        }
    }
}
```

<!-- 4. Update Book -->
# 4. Update Book
 
 Request : 
- Method : PUT
- Endpoint : /books/{bookId}
- Body Request:
```json
{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
```
- Body Response Example:
```json
{
    "status": "success",
    "message": "Buku berhasil diperbarui"
}
```

<!-- 5. Delete Book -->
# 5. Delete Book
 
 Request : 
- Method : DELETE
- Endpoint : /books/{bookId}
- Body Response Example:
```json
{
    "status": "success",
    "message": "Buku berhasil dihapus"
}
```
