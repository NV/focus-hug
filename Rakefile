task :default => [:standalone]

desc 'Build standalone file'
task :standalone => ['chrome/focus-hug.js', 'chrome/focus-hug.css'] do
  require 'jspp'
  File.open('standalone/focus-hug.js', 'w') { |file|
    text = JSPP('standalone/focus-hug.jspp.js')
    file.write(text)
  }
  puts 'standalone/focus-hug.js'
end
