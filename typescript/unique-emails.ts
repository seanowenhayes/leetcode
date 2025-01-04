// https://leetcode.com/problems/unique-email-addresses/

import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

function simplifyLocalName(localName: string): string {
    return localName.split("+")[0].replaceAll(".", "");
}

function simplifyEmail(email: string): string {
    const [localName, domainName] = email.split("@");
    return simplifyLocalName(localName) + "@" + domainName;
}
function numUniqueEmails(emails: string[]): number {
    emails = emails.map(simplifyEmail);
    return new Set(emails).size;
};

Deno.test("unique emails 2", () => {
    const emails = ["test.email+alex@leetcode.com", "test.e.mail+bob.cathy@leetcode.com", "testemail+david@lee.tcode.com"]
    assertEquals(
        numUniqueEmails(emails),
        2
    );
});

Deno.test("unique emails 3", () => {
    const emails = ["a@leetcode.com", "b@leetcode.com", "c@leetcode.com"]
    assertEquals(
        numUniqueEmails(emails),
        3
    );
});