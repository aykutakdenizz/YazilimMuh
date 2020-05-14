INIT

Projeyi çalıştırmak için öncelikle node.js bilgisayarınızda kurulu olmalıdır.(https://nodejs.org/en/download/)

Proje bilgisayarınıza indirildikten sonra bir IDE içerisinde açarak IDE içerisinden veya CMD kullanılarak proje dizinine gelinmelidir. "npm install" yazılarak Server için node bağımlılıkları kurulmalıdır. Buna ek olarak "npm install -g nodemon" komutu çalıştırılmalıdır.

Conf dosyası içerisindeki veritabanı bağlantınızı kurmalısınız.dbConf.js dosyasına girilince DATABASE_NAME, USERNAME, PASSWORD kısımları değiştirilmelidir. Veritabanı bağlantısı kurulduğunda Server otomatik tabloları oluşturacaktır.

Bu noktadan sonra consolda "nodemon app" diyerek server çalıştırmaya başlanabilir.

Bu adımdan sonra consoldan frontend dizinine geçilmelidir. tekrardan "npm install" komutuyla Clieent için bağımlılıklar indirilip "npm start" komutu ile Client çalıştırılır.
