#!/usr/bin/perl
use strict;
use warnings;

sub validate {
    my ($input, $type) = @_;

    if ($type eq 'ip') {
        return $input =~ /^(\d{1,3}\.){3}\d{1,3}$/ ? 1 : 0;
    } elsif ($type eq 'email') {
        return $input =~ /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/ ? 1 : 0;
    }
}

print "IP Addresses:\n";
foreach my $ip ('192.168.0.1', '1.2.3') {
    print "$ip is ", validate($ip, 'ip') ? "valid\n" : "invalid\n";
}

print "\nEmail Addresses:\n";
foreach my $email ('test@example.com', 'invalid-email@.com') {
    print "$email is ", validate($email, 'email') ? "valid\n" : "invalid\n";
}