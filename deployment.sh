# !bin/bash
# run usage: nohup ./deployment.sh &
# this script is for deployment of my capstone project

# 기존의 서버가 돌아가고 있다면 종료
pid=$(sudo lsof -t -i :3000)

if [ -z $pid ]; then
    echo "No server is running"
else
    echo "Terminated current server process $pid"
    kill -9 $pid
fi

# 클론된 디렉토리가 있다면 삭제
if [ -d "/home/bitnami/deploy/capstone" ]; then
    echo "Remove cloned directory"
    rm -rf /home/bitnami/deploy/capstone
fi

# git user info
github_id="h9661"

# write token info
github_token=`cat /home/bitnami/secret/github_token`

# git repository info
repository="https://${github_id}:${github_token}@github.com/${github_id}/capstone"

cloning_dir="/home/bitnami/deploy"

# git clone
cd $cloning_dir
git clone $repository

# install modules
cd capstone
npm install

# make .env file
echo "COOKIE_SECRET=secret" > .env

# run server
npm start

if [ $? -eq 0 ]; then
    echo "suceessfully distributed"
else
    echo "distribution failed"
fi