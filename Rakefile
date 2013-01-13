require 'fileutils'

desc "Load a local server and watch for any changes"
task :preview, :port do |t, args|

  annotate "Starting server on port #{args.port || 4000} and watching for changes."

  jekyll_pid = Process.spawn("jekyll --auto --server #{args.port}")
  compass_pid = Process.spawn("compass watch")

  trap("INT") {
    [jekyll_pid, compass_pid].each { |pid| Process.kill(9, pid) rescue Errno::ESRCH }
    exit 0
  }

  [jekyll_pid, compass_pid].each { |pid| Process.wait(pid) }

end

desc "Compile and generate all site files"
task :generate do

  annotate "Compiling Sass"
  system "compass compile ."

  annotate "Generating site files"
  system "jekyll  --no-auto --no-server"

end

task :deploy => [:generate] do

  annotate "Updating gh-pages branch"

  # Create a temp repo to pull the latest remote gh-pages files from
  mkdir "_tmp"

  cd "_tmp" do
    system "git init"
    system "git remote add origin git@github.com:philipwalton/blog.git"
    system "git pull origin gh-pages"
    system "rm -rf *" # remove all files
    system "cp -r ../_site/ ./" # copy over all the newly deployed files
    system "git add . && git add -u"
    system "git commit -m 'Site deployed at #{Time.now.utc}'"
    system "git branch -m gh-pages"
    system "git push origin gh-pages"
  end

  annotate "Cleaning up"

  # Remove the `_site` and `_tmp` directories, destroy the temp repo
  rm_rf "_site"
  rm_rf "_tmp"

  annotate "Successfully deployed site!"

end

private

def annotate(text)
  puts "\n### #{text} ###\n\n"
end