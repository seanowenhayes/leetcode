package org.example;

public class ReverseLinkedList {
    static public class ListNode {
        int val;
        ListNode next;

        ListNode() {
        }

        ListNode(int val) {
            this.val = val;
        }

        ListNode(int val, ListNode next) {
            this.val = val;
            this.next = next;
        }
    }

    public ListNode reverseList(ListNode head) {
        ListNode trailingPointer = null;
        while (head != null) {
            ListNode leadingPointer = head.next;
            head.next = trailingPointer;
            trailingPointer = head;
            head = leadingPointer;
        }
        return trailingPointer;
    }
}
