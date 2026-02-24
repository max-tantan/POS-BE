## Memulai

```bash
$ git clone https://github.com/alitade/yadika-pplg-xi-be.git [kls-tim-project]
$ rm -rf .git
$
$ git init
$ git add . 
$ git commit -m "first commit"
$ git branch -M main
$ git remote add origin [ssh / http repo]
$ git push -u origin main
```

1. copy file .env.example > .env dan isi paramater di .env
```Bash
$ cp .env.example .env
$ nano .env
```

2. install library node
```bash
$ npm install  
```
3. Migrate & seeder table 

```bash
$ npx knex migrate:latest
$ npx knex seed:run
```
----
### Membuat migrate & seeder
```bash
$ npx knex migrate:make [nama file migrate]
$ npx knex seed:make [nama file seeder]
```

### Menampilkan command-command knex
```bash
$ npx knex help
```
### Aturan GIT
* pull branch develop
* buat branch dengan nama / code task masing - masing dev, branch parent diambil dari develop
* lakukan commit setiap selesai mengerjakan task (beres / tidak beres)
* format message commit :
  * feat : [onprogress / done] nama fitur (untuk fitur yang baru dibuat)
  * fix : [onprogress / done] nama fitur (untuk perbaikan fitur yang sudah ada)
    ```bash
    $ git commit -m "feat: [Onprogress] kelola data siswa" -m "tambah data, hapus data"
    $ git commit -m "feat: [done] kelola data siswa" -m "tambah data, hapus data"
    ```
* push ke branch task masing-masing
* setiap memulai pengerjaan task, harus selalu `pull` code dari branch develop

  contoh : anggap branch `task-001` adalah branch yang aktif
  ```bash
  (task-001) $ git pull origin develop
  ```