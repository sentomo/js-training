# Graceful Shutdownのために送信されるシグナルの種類
## Kubernetes
* SIGTERM、SIGKILL
* 参考
  * [Pod Lifecycle \| Kubernetes](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-termination)
  * [アルパカでもわかる安全なPodの終了](https://zenn.dev/hhiroshell/articles/kubernetes-graceful-shutdown)

## Amazon ECS
* SIGTERM、SIGKILL
* 参考
  * [ECS のアプリケーションを正常にシャットダウンする方法 \| Amazon Web Services ブログ](https://aws.amazon.com/jp/blogs/news/graceful-shutdowns-with-ecs/)