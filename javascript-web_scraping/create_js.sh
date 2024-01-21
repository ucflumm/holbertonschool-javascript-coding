#!/bin/bash

touch "cisfun"
echo "C is super fun!" > "cisfun"
chmod u+x "cisfun"
touch "0-readme.js"
echo "#!/usr/bin/node" > "0-readme.js"
touch "1-writeme.js"
echo "#!/usr/bin/node" > "1-writeme.js"
touch "my_file.txt" && echo "Python is cool" > "my_file.txt"
chmod u+x "my_file.txt"
touch "2-statuscode.js"
echo "#!/usr/bin/node" > "2-statuscode.js"
touch "3-starwars_title.js"
echo "#!/usr/bin/node" > "3-starwars_title.js"
touch "4-starwars_count.js"
echo "#!/usr/bin/node" > "4-starwars_count.js"
touch "5-request_store.js"
echo "#!/usr/bin/node" > "5-request_store.js"
touch "6-completed_tasks.js"
echo "#!/usr/bin/node" > "6-completed_tasks.js"
chmod u+x *.js
ls -l