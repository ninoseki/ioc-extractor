# frozen_string_literal: true

require "http"

def get_latest_tlds
  url = "https://data.iana.org/TLD/tlds-alpha-by-domain.txt"

  res = HTTP.get(url)
  lines = res.body.to_s.lines
  lines.reject { |line| line.start_with? "#" }.map(&:chomp).map(&:downcase)
end

path = File.expand_path("../src/aux/tlds.ts", __dir__)
data = File.read(path)

latest_tlds = get_latest_tlds
latest_tlds.each do |tld|
  p tld unless data.include?(tld)
end
