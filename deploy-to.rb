branch = ENV['GIT_BRANCH'] || ARGV.first

unless branch
  puts "Please supply a GIT_BRANCH or argument"
  exit 1
end

puts case branch
when 'develop' then 'stage'
when 'stage' then 'stage'
when 'preprod' then 'preprod'
when 'master'  then 'prod'
end
exit 0
