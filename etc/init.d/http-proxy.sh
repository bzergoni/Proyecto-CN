DIR=/var/www/ciudad
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
NODE_PATH=/usr/local/lib/node_modules

case $1 in
   start)
      nohup "node" "$DIR/proxy.js" 1>>"$DIR/logs/proxy.log" 2>&1 &
      echo $! > "$DIR/pids/proxy.pid";
      ;;
    stop)
      kill `cat $DIR/pids/proxy.pid` ;;
    *)
      echo "usage: /etc/init.d/http-proxy {start|stop}" ;;
esac
exit 0
