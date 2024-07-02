package org.example;

import org.junit.Test;
import static org.junit.Assert.*;

public class ReversedLinkedListTest {
    @Test
    public void shouldReverseList() {
        ReverseLinkedList classUnderTest = new ReverseLinkedList();

        ReverseLinkedList.ListNode input = new ReverseLinkedList.ListNode(
                1, new ReverseLinkedList.ListNode(
                        2, new ReverseLinkedList.ListNode(
                                3, new ReverseLinkedList.ListNode(
                                        4, new ReverseLinkedList.ListNode(
                                                5, null)))));

        ReverseLinkedList.ListNode output = classUnderTest.reverseList(input);
        assertEquals(5, output.val);
        assertEquals(4, output.next.val);
        assertEquals(3, output.next.next.val);
        assertEquals(2, output.next.next.next.val);
        assertEquals(1, output.next.next.next.next.val);
    }
}