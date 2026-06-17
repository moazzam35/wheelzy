'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useOrders } from '@/hooks/useOrders';
import { useFavorites } from '@/hooks/useFavorites';
import { useBookings } from '@/hooks/useBookings';
import { useMessages } from '@/hooks/useMessages';

export default function UserDashboard() {
  const { user, isAuthenticated, status: authStatus } = useAuth();
  const { orders, loading: ordersLoading, fetchOrders } = useOrders();
  const { favorites, fetchFavorites } = useFavorites();
  const { bookings, fetchBookings } = useBookings();
  const { messages, fetchMessages } = useMessages();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      Promise.all([fetchOrders(), fetchFavorites(), fetchBookings(), fetchMessages()]).then(() =>
        setLoaded(true)
      );
    }
  }, [isAuthenticated, fetchOrders, fetchFavorites, fetchBookings, fetchMessages]);

  if (authStatus === 'loading') {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading dashboard...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem' }}>Please login to access your dashboard</h2>
        <Link href="/login" style={{ padding: '0.8rem 1.5rem', background: 'var(--gold)', color: 'var(--btn-on-gold)', fontWeight: '600', borderRadius: '4px' }}>
          Go to Login
        </Link>
      </div>
    );
  }

  const recentOrders = orders.slice(0, 5);

  const stats = [
    { name: 'Total Orders', value: loaded ? String(orders.length) : '–', icon: '🛒' },
    { name: 'Favorites', value: loaded ? String(favorites.length) : '–', icon: '❤️' },
    { name: 'Test Drives', value: loaded ? String(bookings.length) : '–', icon: '🚗' },
    { name: 'Messages', value: loaded ? String(messages.length) : '–', icon: '💬' },
  ];

  const statusColors = {
    PENDING: { bg: 'rgba(201,168,76,0.15)', color: '#c9a84c' },
    COMPLETED: { bg: 'rgba(39,174,96,0.15)', color: '#27ae60' },
    CANCELLED: { bg: 'rgba(192,57,43,0.15)', color: '#c0392b' },
  };

  return (
    <div style={{ padding: '3rem', maxWidth: '1200px', margin: '0 auto', minHeight: '60vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Dashboard</h1>
        <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>
          Welcome back, {user?.name || 'User'}! Here's what's happening with your account.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map((stat) => (
          <div
            key={stat.name}
            style={{
              background: 'var(--surface2)',
              border: '1px solid var(--border-dim)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.25rem 1.5rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{stat.name}</p>
                <p style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{stat.value}</p>
              </div>
              <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        {/* User Info Card */}
        <div style={{ background: 'var(--surface2)', border: '1px solid var(--border-dim)', borderRadius: 'var(--radius-sm)', padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.25rem' }}>Account Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Full name</p>
              <p style={{ fontWeight: '500' }}>{user?.name || 'Loading...'}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email address</p>
              <p style={{ fontWeight: '500' }}>{user?.email || 'Loading...'}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Role</p>
              <span style={{
                display: 'inline-block',
                padding: '0.15rem 0.6rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                background: user?.role === 'ADMIN' ? 'rgba(192,57,43,0.15)' : 'rgba(39,174,96,0.15)',
                color: user?.role === 'ADMIN' ? '#c0392b' : '#27ae60',
              }}>
                {user?.role === 'ADMIN' ? 'Admin' : 'Member'}
              </span>
            </div>
          </div>
          <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/profile" style={{ padding: '0.55rem 1.2rem', background: 'var(--gold)', color: 'var(--btn-on-gold)', fontWeight: '600', borderRadius: '4px', fontSize: '0.85rem' }}>
              Edit Profile
            </Link>
            <Link href="/settings" style={{ padding: '0.55rem 1.2rem', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: '4px', fontSize: '0.85rem' }}>
              Account Settings
            </Link>
          </div>
        </div>

        {/* Recent Orders */}
        <div style={{ background: 'var(--surface2)', border: '1px solid var(--border-dim)', borderRadius: 'var(--radius-sm)', padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.25rem' }}>Recent Orders</h3>
          {ordersLoading && <p style={{ color: 'var(--text-muted)' }}>Loading orders...</p>}
          {!ordersLoading && recentOrders.length === 0 && (
            <p style={{ color: 'var(--text-muted)' }}>No orders yet. <Link href="/cars" style={{ color: 'var(--gold)' }}>Browse cars</Link></p>
          )}
          {recentOrders.length > 0 && (
            <>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-dim)' }}>
                      <th style={{ textAlign: 'left', padding: '0.6rem 0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>Car</th>
                      <th style={{ textAlign: 'left', padding: '0.6rem 0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>Date</th>
                      <th style={{ textAlign: 'left', padding: '0.6rem 0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>Status</th>
                      <th style={{ textAlign: 'right', padding: '0.6rem 0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '500' }}>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => {
                      const sc = statusColors[order.status] || statusColors.PENDING;
                      return (
                        <tr key={order.id} style={{ borderBottom: '1px solid var(--border-dim)' }}>
                          <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.9rem' }}>{order.car?.name || 'Vehicle'}</td>
                          <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td style={{ padding: '0.75rem 0.5rem' }}>
                            <span style={{
                              display: 'inline-block',
                              padding: '0.15rem 0.6rem',
                              borderRadius: '999px',
                              fontSize: '0.7rem',
                              fontWeight: '600',
                              background: sc.bg,
                              color: sc.color,
                            }}>
                              {order.status}
                            </span>
                          </td>
                          <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.9rem', textAlign: 'right', color: 'var(--gold)' }}>
                            ${order.pricePaid?.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <Link href="/orders" style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: '500' }}>
                  View all orders →
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        <Link href="/cars" style={{ padding: '1rem', background: 'var(--gold)', color: 'var(--btn-on-gold)', fontWeight: '600', borderRadius: '4px', textAlign: 'center' }}>
          Browse Cars
        </Link>
        <Link href="/sell" style={{ padding: '1rem', border: '1px solid var(--border)', color: 'var(--text)', fontWeight: '600', borderRadius: '4px', textAlign: 'center' }}>
          Sell Your Car
        </Link>
        <Link href="/testdrive" style={{ padding: '1rem', border: '1px solid var(--border)', color: 'var(--text)', fontWeight: '600', borderRadius: '4px', textAlign: 'center' }}>
          Schedule Test Drive
        </Link>
        <Link href="/financing" style={{ padding: '1rem', border: '1px solid var(--border)', color: 'var(--text)', fontWeight: '600', borderRadius: '4px', textAlign: 'center' }}>
          Check Financing
        </Link>
      </div>
    </div>
  );
}
